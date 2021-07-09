declare type TypedRequest<ReqParam = {}, ReqBody = {}, QueryParams = {}> = {
  params: ReqParam;
  body: ReqBody;
  query: QueryParams;
};
declare type TypedResponse<ResBody = any> = ResBody;

/**
 * Dir
 */

// GET /api/dir
declare type GetDirRequestBody = {};
declare type GetDirRequestQueryParams = { dir: string };
declare type GetDirRequest = TypedRequest<{}, GetDirRequestBody, GetDirRequestQueryParams>;
declare type GetDirResponseBody = {};
declare type GetDirResponse = TypedResponse<GetDirResponseBody>;

/**
 * Apps
 */

// GET /api/apps
declare type GetAppsRequest = TypedRequest<{}, {}, {}>;
declare type GetAppsResponseBody = { apps: IApp[] };
declare type GetAppsResponse = TypedResponse<GetAppsResponseBody>;

// GET /api/apps/:appId
declare type GetAppRequestParams = { appId: string };
declare type GetAppRequest = TypedRequest<GetAppRequestParams, {}, {}>;
declare type GetAppResponseBody = { app: IApp };
declare type GetAppResponse = TypedResponse<GetAppResponseBody>;

// POST /api/apps
declare type CreateAppRequestBody = { name };
declare type CreateAppRequest = TypedRequest<{}, CreateAppRequestBody, {}>;
declare type CreateAppResponseBody = { app: IApp };
declare type CreateAppResponse = TypedResponse<CreateAppResponseBody>;

// POST /api/apps/:appId/commands
declare type AddAppCommandRequestParams = { appId: string };
declare type AddAppCommandRequestBody = { name: string; command: string };
declare type AddAppCommandRequest = TypedRequest<AddAppCommandRequestParams, AddAppCommandRequestBody, {}>;
declare type AddAppCommandResponseBody = { app: IApp };
declare type AddAppCommandResponse = TypedResponse<AddAppCommandResponseBody>;

// POST /api/apps/:appId/commands/:commandId
declare type UpdateAppCommandRequestParams = { appId: string; commandId: string };
declare type UpdateAppCommandRequestBody = { name?: string; command?: string };
declare type UpdateAppCommandRequest = TypedRequest<UpdateAppCommandRequestParams, UpdateAppCommandRequestBody, {}>;
declare type UpdateAppCommandResponseBody = { app: IApp };
declare type UpdateAppCommandResponse = TypedResponse<UpdateAppCommandResponseBody>;

// DELETE /api/apps/:appId/commands/:commandId
declare type DeleteAppCommandRequestParams = { appId: string; commandId: string };
declare type DeleteAppCommandRequest = TypedRequest<DeleteAppCommandRequestParams, {}, {}>;
declare type DeleteAppCommandResponseBody = { app: IApp };
declare type DeleteAppCommandResponse = TypedResponse<DeleteAppCommandResponseBody>;

// POST /api/apps/:appId/commands/:commandId/runs
declare type RunAppCommandRequestParams = { appId: string; commandId: string };
declare type RunAppCommandRequest = TypedRequest<RunAppCommandRequestParams, {}, {}>;
declare type RunAppCommandResponseBody = { runResult: IRunResult };
declare type RunAppCommandResponse = TypedResponse<RunAppCommandResponseBody>;

// GET /api/apps/:appId/commands/:commandId/runs/:runId
declare type GetCommandRunRequestParams = { appId: string; commandId: string; runId: string };
declare type GetCommandRunRequest = TypedRequest<GetCommandRunRequestParams, {}, {}>;
declare type GetCommandRunResponseBody = { runResult: IRunResult };
declare type GetCommandRunResponse = TypedResponse<GetCommandRunResponseBody>;
