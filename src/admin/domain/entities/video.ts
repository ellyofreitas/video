import { Tag } from './tag';

export class Video {
  readonly tags: Tag[] = [];

  constructor(
    readonly id: string,
    readonly storageKey: string,
    readonly title: string,
    readonly description: string
  ) {}

  addTag(name: string) {
    this.tags.push(new Tag(name));
  }
}
