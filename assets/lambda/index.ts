import { spawnSync } from 'child_process';
import { CdkCustomResourceHandler, CdkCustomResourceResponse } from 'aws-lambda';

export const handler: CdkCustomResourceHandler = async function (event, context) {
  const requestType = event.RequestType;
  const funcResponse: CdkCustomResourceResponse = {
    PhysicalResourceId: context.logStreamName,
    Data: {} as { [key: string]: string },
  };

  if (requestType === 'Create' || requestType === 'Update') {
    const imageUri = event.ResourceProperties.imageUri as string;
    const ignore = event.ResourceProperties.ignore as string[];

    if (!imageUri) throw new Error('imageUri is required.');

    const ignoreOptions = ignore.map((opt) => `-i ${opt}`).join(' ');
    const response = spawnSync(
      `dockle --exit-code 1 --exit-level fatal ${ignoreOptions} ${imageUri}`,
      {
        shell: true,
      },
    );

    console.log('imageUri: ' + imageUri);
    console.log('stdout:\n' + response.stdout?.toString());
    console.log('stderr:\n' + response.stderr?.toString());

    if (response.status !== 0)
      throw new Error(
        `Image Scanner returned fatal errors. You may have vulnerabilities. See logs.`,
      );
  }

  return funcResponse;
};
