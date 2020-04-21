export interface Graphicable {
  type: 'Feature',
  geometry: object,
  properties: {
    code?: string,
    [propName: string]: any
  }
}