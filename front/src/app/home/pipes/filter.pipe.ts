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
    let result: any = [];
    let flag: any = 0;
    if (!allPosts || propertyName == '') {
      return allPosts;
    }
    if (searchTerm == '') {
      // result = [];
      result = allPosts.filter((post: any) => {
        return selectedTags.every((tag: any) => {
          return post.tags.includes(tag);
        });
      });
      console.log('if no key', result);

      // allPosts.forEach((post: any) => {
      //   for (const tag of selectedTags) {
      //     if (!post.tags.includes(tag)) {
      //       flag = 1;
      //       break;
      //     }
      //   }
      //   flag == 0 && result.push(post);
      // });
      flag = 0;
    } else {
      result = [];
      if (selectedTags.length > 0) {
        console.log(selectedTags.length);

        // result = [];
        result = allPosts.filter((post: any) => {
          return selectedTags.every((tag: any) => {
            return (
              post.tags.includes(tag) &&
              post[propertyName]
                .trim()
                .split(' ')
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.trim().split(' ').join(' ').toLowerCase())
            );
          });
        });
        console.log('if no tag', result);
      } else {
        // result = [];
        result = allPosts.filter((post: any) => {
          return post[propertyName]
            .trim()
            .split(' ')
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.trim().split(' ').join(' ').toLowerCase());
        });
        console.log('if tag', result);
      }

      // result = allPosts.filter((post: any) => {
      //   return post[propertyName]
      //     .trim()
      //     .split(' ')
      //     .join(' ')
      //     .toLowerCase()
      //     .includes(searchTerm.trim().split(' ').join(' ').toLowerCase());
      // });
    }

    return result;
  }
}
