import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsbdiningcommonsmenuitem",
        method: "DELETE",
        // Stryker disable all
        params: {
            id: cell.row.values.id
        }
        // Stryker restore all
    }
}