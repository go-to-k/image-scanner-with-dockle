import { spawnSync } from 'child_process';
import { CdkCustomResourceHandler, CdkCustomResourceResponse } from 'aws-lambda';

interface ScannerProps {
  addr: string;
  imageUri: string;
  ignore: string[];
}

export const handler: CdkCustomResourceHandler = async function (event) {
  const requestType = event.RequestType;
  const props = event.ResourceProperties as unknown as ScannerProps;

  if (!props.addr || !props.imageUri) throw new Error('addr and imageUri are required.');

  const funcResponse: CdkCustomResourceResponse = {
    PhysicalResourceId: props.addr,
    Data: {} as { [key: string]: string },
  };

  if (requestType === 'Create' || requestType === 'Update') {
    const ignoreOptions = props.ignore.map((opt) => `-i ${opt}`).join(' ');
    const response = spawnSync(
      `/opt/dockle --exit-code 1 --exit-level fatal --no-color ${ignoreOptions} ${props.imageUri}`,
      {
        shell: true,
      },
    );

    console.log('imageUri: ' + props.imageUri);
    console.log('stdout:\n' + response.stdout?.toString());
    console.log('stderr:\n' + response.stderr?.toString());

    if (response.status !== 0)
      throw new Error(
        `Image Scanner returned fatal errors. You may have vulnerabilities. See logs.`,
      );
  }

  return funcResponse;
};
