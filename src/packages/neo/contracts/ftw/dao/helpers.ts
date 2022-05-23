import { InvokeResult } from "@cityofzion/neon-core/lib/rpc";
import {parseMapValue} from "../../../utils";
import {StackItem, StackItemJson} from "@cityofzion/neon-core/lib/sc";

export const parseChannelsPaginate = (res: StackItemJson) => parseMapValue(res as any)
