module.exports = {
  name: 'common-util',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/util',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
