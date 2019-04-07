import { parse, stringify } from "query-string";

export default async function querySetParam(query, name, value, currentPath) {
  query = parse(query);
  query[`${name}`] = value;
  await this.props.history.push(`${currentPath}?${stringify(query)}`);
}
