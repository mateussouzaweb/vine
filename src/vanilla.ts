export const __version = '1.0.0'

export * from "./core/utils"
export * from "./core/selector"
export * from "./core/events"
export * from "./core/promise"
export * from "./core/template"

export * from "./component/component";
export * from "./component/destroy";
export * from "./component/events";
export * from "./component/mount";
export * from "./component/render";
export * from "./component/state";

export * as http from "./http/http"
export * as route from "./route/route"
export * as local from "./storage/local"
export * as session from "./storage/session"