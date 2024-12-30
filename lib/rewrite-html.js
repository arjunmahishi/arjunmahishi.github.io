export const rewriteHtml = (node, index, parent) => {
  rewriteImages(node, index, parent)
}

const rewriteImages = (node, index, parent) => {
  // if (node.type === 'text') {
  //   const regex = /\[\[\s*images\s+(?<paths>.+)\s*\]\]/g;
  //   const matches = [...node.value.matchAll(regex)];

  //   if (matches.length > 0) {
  //     console.log(parent)
  //     matches.forEach((match) => {
  //       match.groups.paths.trim().split(' ').forEach((path) => {
  //         // const imgNode = {
  //         //   type: 'element',
  //         //   tagName: 'img',
  //         //   properties: {
  //         //     src: path,
  //         //     alt: path,
  //         //     className: 'w-full',
  //         //   },
  //         // }

  //         // parent.splice(index, 1, imgNode)
  //       })
  //     })
  //   }
  // }
}
