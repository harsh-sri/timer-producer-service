import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from '@jozefazz/nestjs-redoc';
import { apiDescription, apiTitle, xTagGroups } from './constants';
import { HealthCheckModule } from 'src/health-check/health-check.module';
import { TimerModule } from 'src/timer/timer.module';

const setup = async (
  app,
  moduleToIncludes,
  apiDocsPath,
  extraXTagGroups = [],
  version = '1.0.0',
) => {
  const options = new DocumentBuilder()
    .setVersion(version)
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [TimerModule, HealthCheckModule, ...moduleToIncludes],
  });

  document['x-tagGroups'] = [...extraXTagGroups, ...xTagGroups];

  const redocOptions: RedocOptions = {
    title: apiTitle,
    sortPropsAlphabetically: true,
    hideHostname: false,
    noAutoAuth: false,
    showExtensions: true,
    nativeScrollbars: true,
  };

  await RedocModule.setup(apiDocsPath, app, document, redocOptions);

  Logger.log(`API docs are available at ${apiDocsPath}`, 'doc.ts');

  return document;
};

export const setupApiDoc = async (app) => {
  await setup(app, [], '/docs', [], '1.0.0');
};
