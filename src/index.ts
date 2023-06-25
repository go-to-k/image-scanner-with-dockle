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
  readonly imageUri: string;
  readonly repository: IRepository;
  readonly ignore?: string[];
}

export class ImageScannerWithDockle extends Construct {
  constructor(scope: Construct, id: string, props: ImageScannerWithDockleProps) {
    super(scope, id);

    const { imageUri, repository, ignore } = props;

    const customResourceLambda = new SingletonFunction(this, 'CustomResourceLambda', {
      uuid: '662deedd-2d01-1bd0-45de-8d80b1bffe38',
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
    imageScannerProperties.imageUri = imageUri;
    imageScannerProperties.ignore = ignore ?? [];

    new CustomResource(this, 'Default', {
      resourceType: 'Custom::ImageScannerWithDockle',
      properties: imageScannerProperties,
      serviceToken: imageScannerProvider.serviceToken,
    });
  }
}
