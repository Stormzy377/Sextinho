import { FilterStatus } from "@/types/FilterStatus";
import { CircleDashed, CircleCheck } from "lucide-react-native";

export function StatusIcon({ status }: { status: FilterStatus }) {
    return status === FilterStatus.DONE ? (
        <CircleCheck color="#1DB863" />
    ) : (
        <CircleDashed color="#000000"/>
    )
}