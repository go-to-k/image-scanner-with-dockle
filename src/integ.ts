import { resolve } from 'path';
import { App, Stack } from 'aws-cdk-lib';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { ImageScannerWithDockle } from '.';

const app = new App();
const stack = new Stack(app, 'ImageScannerWithDockleStack');

const image = new DockerImageAsset(stack, 'DockerImage', {
  directory: resolve(__dirname, '../assets/lambda'),
  platform: Platform.LINUX_ARM64,
});

new ImageScannerWithDockle(stack, 'ImageScannerWithDockle1', {
  imageUri: image.imageUri,
  repository: image.repository,
});

new ImageScannerWithDockle(stack, 'ImageScannerWithDockle2', {
  imageUri: image.imageUri,
  repository: image.repository,
  ignore: [],
});

new ImageScannerWithDockle(stack, 'ImageScannerWithDockle3', {
  imageUri: image.imageUri,
  repository: image.repository,
  ignore: ['CIS-DI-0009'],
});
