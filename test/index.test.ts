import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { ImageScannerWithDockle } from '../src';

const getTemplate = (): Template => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  const repository = new Repository(stack, 'ImageRepository', {});

  new ImageScannerWithDockle(stack, 'ImageScannerWithDockle', {
    imageUri: 'imageUri',
    repository: repository,
    ignore: ['CIS-DI-0009'],
  });
  return Template.fromStack(stack);
};

describe('Fine-grained Assertions Tests', () => {
  const template = getTemplate();

  test('Snapshot test', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('ImageScannerWithDockle created', () => {
    template.resourceCountIs('Custom::ImageScannerWithDockle', 1);
  });
});
