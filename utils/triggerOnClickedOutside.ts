import { MutableRefObject, Ref } from "react";

const triggerOnClickedOutside = (ref: MutableRefObject<HTMLElement>, fn: () => any) => {
    const listener = (e: MouseEvent) => {
      const optionsDiv = ref.current as HTMLDivElement
      const isChild = optionsDiv.contains(e.target as Node)
        if (!isChild) fn();
    }
    document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
}


export default triggerOnClickedOutside;