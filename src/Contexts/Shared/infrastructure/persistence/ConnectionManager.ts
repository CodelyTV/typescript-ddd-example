export interface ConnectionManager {
  connect(): Promise<void>;
  close(): Promise<void>;
}
