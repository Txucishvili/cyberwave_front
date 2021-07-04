// import React from "react"
// import { createPortal } from "react-dom"


// export const usePortal = (parrent: any, child:any ) => {
//   console.log('[usePortal]',  child.current);
//   const from = child.current;
//   const to = parrent.current;

//   // return;

//   return createPortal(from, to);
// }

import React, { useRef, useEffect } from 'react';

function createRootElement(id: any) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function usePortal(id: any, parent: any) {
  // const rootElemRef: any = useRef(null);
  const rootElemRef: any = parent;

  useEffect(function setupElement() {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id);

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      rootElemRef.current.remove();
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  // function getRootElem() {
  //   if (!rootElemRef.current) {
  //     rootElemRef.current = document.createElement('div');
  //   }
  //   return rootElemRef.current;
  // }

  return null;
}

export default usePortal;