// For shared global interface types.

declare global {
  interface IUser {
    id: string;
    userName: string;
  }

  interface IApp {
    id: string;
    name: string;
    commands: IAppCommand[];
  }

  interface IAppCommand {
    id: string;
    name: string;
    command: string;
  }

  interface IRunResult {
    id: string;
    status: RunStatus;
    success?: boolean; // Only non-null when status is 'complete'
    output?: string; // Only non-null when status is 'complete'
  }

  type RunStatus = 'pending' | 'running' | 'complete';
}

export type ExpressRequestUser = IUser;
