


export const isFunction = (thing) => {
 return thing && {}.toString.call(thing) === '[object Function]';
}
