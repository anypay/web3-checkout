import { useState } from 'react'

export const useAccordionState = ({ preExpanded }: { preExpanded: string[] }) => {
  const [getter, setter] = useState<string[] | null>(preExpanded)

  const getActive = () => (getter || [])[0]
  const setActive = (uuid: string[]) => setter(uuid)

  return {
    getActive,
    setActive,
  }
}
