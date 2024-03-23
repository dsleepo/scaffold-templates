import {
    FC,
    useDeferredValue,
    useCallback,
    useContext,
    useId,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
    useTransition,
} from 'react';
import {
    Button,
    Flex,
    Loader,
    Text,
} from '@gravity-ui/uikit';

import {cn} from 'util/cn';

const b = cn('{{ kebabCase name }}');

type {{ pascalCase name }}Props = {
    show: boolean;
};

export const {{ pascalCase name }}Name: FC<{{ pascalCase name }}Props> = ({ show }) => {
    const [ready, setReady] = useState(false);
    useEffect(() => {}, []);

    return (
        <div className={b()}></div>
    );
};
