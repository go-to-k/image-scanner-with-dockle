import { spawnSync } from 'child_process';
import { CdkCustomResourceHandler, CdkCustomResourceResponse } from 'aws-lambda';

export const handler: CdkCustomResourceHandler = async function (event) {
  const requestType = event.RequestType;

  const addr = event.ResourceProperties.addr as string;
  const imageUri = event.ResourceProperties.imageUri as string;
  const ignore = event.ResourceProperties.ignore as string[];
  if (!addr || !imageUri) throw new Error('addr and imageUri are required.');

  const funcResponse: CdkCustomResourceResponse = {
    PhysicalResourceId: addr,
    Data: {} as { [key: string]: string },
  };

  if (requestType === 'Create' || requestType === 'Update') {
    const ignoreOptions = ignore.map((opt) => `-i ${opt}`).join(' ');
    const response = spawnSync(
      `/opt/dockle/dockle --exit-code 1 --exit-level fatal --no-color ${ignoreOptions} ${imageUri}`,
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
