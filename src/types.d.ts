declare module "really-relaxed-json" {
    export function convert(rjsonString: string): string
    export function toJson(rjsonString: string, compact?: boolean): string
    export function toJs(rjsonString: string, compact?: boolean): string
}
