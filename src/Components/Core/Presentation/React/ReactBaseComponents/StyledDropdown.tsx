import React, { useState } from "react";
type Props = Partial<{
  isOpen: boolean;
}>;

export default function StyledDropdown({ isOpen = false }: Props) {
  const [isOpenState, setisOpenState] = useState(isOpen);

  return <div>StyledDropdown</div>;
}
