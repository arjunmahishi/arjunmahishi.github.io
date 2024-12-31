export const imageHandler = (state, node) => {
  let match = node.url.match(/\/img\/{(\S+)}/)

  if (!match) {
    // this is a regular image
    const properties = { src: node.url }

    if (node.alt !== null && node.alt !== undefined) {
      properties.alt = node.alt
    }

    if (node.title !== null && node.title !== undefined) {
      properties.title = node.title
    }

    /** @type {Element} */
    const result = { type: 'element', tagName: 'img', properties, children: [] }
    state.patch(node, result)
    return state.applyData(node, result)
  }

  // if the url matches \/img\/{(\S+)} then we know that this contains multiple
  // urls seperated by commas within the curly braces.
  const urls = match[1].split(',')

  // create a div with multiple img tags
  const images = urls.map((url) => {
    return {
      type: 'element',
      tagName: 'img',
      properties: {
        src: `/img/${url}`,
        style: `border-radius: 10px; margin-top: 0; margin-bottom: 0;`
      },
      children: []
    }
  })

  const outerDiv = {
    type: 'element',
    tagName: 'div',
    properties: {
      className: 'flex',
      style: `overflow-x: auto; height: 17rem; gap: 1rem; justify-content: space-around;`
    },
    children: images,
  }

  state.patch(node, outerDiv)
  return state.applyData(node, outerDiv)
}
