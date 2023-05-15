import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    allPosts: any[],
    searchTerm: string,
    propertyName: string,
    selectedTags: any[]
  ): any[] {
    const result: any = [];
    let flag: any = 0;
    if (!allPosts || propertyName == '') {
      return allPosts;
    }
    if (searchTerm == '') {
      allPosts.forEach((post: any) => {
        for (const tag of selectedTags) {
          if (!post.tags.includes(tag)) {
            flag = 1;
            break;
          }
        }
        flag == 0 && result.push(post);
      });
      flag = 0;
    } else {
      for (const post of allPosts) {
        if (
          post[propertyName]
            .trim()
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase() && flag == 0)
        ) {
          for (const tag of selectedTags) {
            if (!post.tags.includes(tag)) {
              flag = 1;
            }
          }
          flag == 0 && result.push(post);
        }
      }
      flag = 0;
    }

    return result;
  }
}
