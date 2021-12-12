import { Readable, PassThrough, TransformOptions } from 'stream';

export function copyStream(
  stream: Readable | PassThrough,
  options?: TransformOptions
) {
  const output = new PassThrough(options);
  output.setMaxListeners(0);
  stream.pipe(output);
  stream.once('error', output.emit.bind(output, 'error'));
  return output;
}
