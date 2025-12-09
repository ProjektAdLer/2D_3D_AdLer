import { createBrowserHistory, createHashHistory, History } from "history";
import { parseBool } from "src/Lib/ParseBool";

/**
 * Creates the appropriate history instance based on the backend mode.
 *
 * For file-based backend mode (deployed to simple static servers),
 * we use hash-based routing (e.g., /#/worldmenu) because:
 * - The hash part is never sent to the server
 * - Works on any static file server without configuration
 * - Supports page reload without 404 errors
 *
 * For normal mode (with API backend), we use browser history
 * (e.g., /worldmenu) for cleaner URLs, assuming the server
 * is properly configured with historyApiFallback.
 */
const useFileBasedBackend = parseBool(
  process.env.REACT_APP_USE_FILEBASED_BACKEND || false,
);

const history: History = useFileBasedBackend
  ? createHashHistory()
  : createBrowserHistory();

export default history;
