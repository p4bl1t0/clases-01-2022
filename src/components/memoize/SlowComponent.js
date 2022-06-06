import React, { useEffect, useState } from "react";

export default function SlowComponent ({ value, onLog }) {
    const start = new Date().getTime();
    for (let index = 0; index < 2999999999; index++) {
        // force wait
    }
    const end = new Date().getTime();
    console.log('Elapsed Comp: ', end - start);
    onLog(value);
    return ( 
        <div>El valor del componente lento es { value }</div>
    );
}

export const MemoFastComponent = React.memo(SlowComponent);

export function slowFn (a, b) {
    const start = new Date().getTime();
    for (let index = 0; index < 2999999999; index++) {
        // force wait
    }
    const end = new Date().getTime();
    console.log('Elapsed slowFN: ', end - start);
    return 'A + B: ' + (a + b);
}