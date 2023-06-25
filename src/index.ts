import { join } from 'path';
import { CustomResource, Duration } from 'aws-cdk-lib';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import {
  Architecture,
  AssetCode,
  Handler,
  Runtime,
  SingletonFunction,
} from 'aws-cdk-lib/aws-lambda';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export interface ImageScannerWithDockleProps {
  /*
    Image URI for scan target
  */
  readonly imageUri: string;

  /*
    Repository including the image URI for scan target
      - Because of grantPull to CustomResourceLambda
  */
  readonly repository: IRepository;

  /*
    Ignore rule (Checkpoints)
      - See https://github.com/goodwithtech/dockle#checkpoint-summary
  */
  readonly ignore?: string[];
}

export class ImageScannerWithDockle extends Construct {
  constructor(scope: Construct, id: string, props: ImageScannerWithDockleProps) {
    super(scope, id);

    const { imageUri, repository, ignore } = props;

    const customResourceLambda = new SingletonFunction(this, 'CustomResourceLambda', {
      uuid: '662deedd-2d01-1bd0-45de-8d80b1bffe38',
      lambdaPurpose: 'Custom::ImageScannerWithDockleCustomResourceLambda',
      runtime: Runtime.FROM_IMAGE,
      handler: Handler.FROM_IMAGE,
      code: AssetCode.fromAssetImage(join(__dirname, '../assets/lambda')),
      architecture: Architecture.ARM_64,
      timeout: Duration.seconds(900),
      retryAttempts: 0,
    });
    repository.grantPull(customResourceLambda);

    const imageScannerProvider = new Provider(this, 'Provider', {
      onEventHandler: customResourceLambda,
    });

    const imageScannerProperties: { [key: string]: string | string[] } = {};
    imageScannerProperties.addr = this.node.addr;
    imageScannerProperties.imageUri = imageUri;
    imageScannerProperties.ignore = ignore ?? [];

    new CustomResource(this, 'Default', {
      resourceType: 'Custom::ImageScannerWithDockle',
      properties: imageScannerProperties,
      serviceToken: imageScannerProvider.serviceToken,
    });
  }
}
