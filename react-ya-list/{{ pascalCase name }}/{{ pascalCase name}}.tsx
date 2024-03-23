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
import {useHistory} from 'react-router';
import {
    Button,
    Flex,
    Loader,
    Table,
    TableActionConfig,
    TableColumnConfig,
    Text,
    TextInput,
    withTableActions,
} from '@gravity-ui/uikit';
import {
    TrashBin,
} from '@gravity-ui/icons';
import {useQuery} from '@tanstack/react-query';
import {
    PlaceholderContainer,
    StatusIllustrationStatus,
} from '@yandex-data-ui/cloud-components';

import sdk from 'services/sdk';
import {cn} from 'util/cn';
import {format as formatDate} from 'util/dates';
import {extractMessage} from 'util/error';
import dayjs from 'util/extendDayjs';

import './{{ kebabCase name }}.scss';

const b = cn('{{ kebabCase name }}');

type TableItem = {
    id: number; 
    name: string;
    createdAt: string
};

const {{ pascalCase name }}Table = withTableActions<TableItem>(Table);

const getRowActions = (
    onDestroy: (item: TableItem) => Promise<void>,
): TableActionConfig<TableItem>[] => {
    return [
        {
            text: 'Удалить',
            handler: onDestroy,
            theme: 'danger',
            icon: <TrashBin />,
        },
    ];
};

const columns: TableColumnConfig<TableItem>[] = [
    {id: 'id', name: 'Идентификатор', width: 270},
    {id: 'name', name: 'Название'},
    {
        id: 'createdAt', 
        name: 'Дата создания', 
        template: (val) => val ? formatDate(dayjs(val)) : '-',
    },
];

type {{ pascalCase name }}Props = {
    show: boolean;
};

export const {{ pascalCase name }}Name: FC<{{ pascalCase name }}Props> = ({ show }) => {
    const {push} = useHistory();

    const [search, setSearch] = useState('');
    const searchLowerCase = search.toLowerCase();

    const {isLoading, data, error} = useQuery<{items: TableItem[]}>({
        queryKey: ['get{{ pascalCase name }}'],
        queryFn: () => sdk.monitoringCloud.get{{ pascalCase name }}(),
    });

    const items = data?.items.filter(({name}) =>
        name.toLowerCase().startsWith(searchLowerCase),
    ) ?? [];

    const handleDestroy = useCallback(
        async (tableItem: TableItem) => {
            console.log('handleDestroy', {tableItem});
        },
        [],
    );

    const handleAdd = useCallback(
        async () => {
            console.log('handleAdd');
        },
        [],
    );

    const rowActions = useCallback(() => {
        return getRowActions(handleDestroy);
    }, [handleDestroy]);

    return (
            <Flex
                className={b()}
                direction="column"
                gap={4}
                alignItems="flex-start"
            >
                {isLoading && (
                    <Flex justifyContent="center">
                        <Loader size="l" />
                    </Flex>
                )}
                {!isLoading && Boolean(error) && (
                    <PlaceholderContainer
                        status={StatusIllustrationStatus.AccessDenied}
                        title={'Произошла ошибка'}
                        description={extractMessage(error)}
                    />
                )}
                {!isLoading && data?.items.length === 0 && (
                    <PlaceholderContainer
                        size="m"
                        contentContainerSize="m"
                        title={
                            'Title'
                        }
                        status={StatusIllustrationStatus.Empty}
                        description={`description`}
                        action=\{{
                            text: 'Добавить',
                        }}
                    />
                )}
                {!isLoading && (data?.items.length ?? 0) > 0 && (
                    <>
                        <Flex
                            className={b('form')}
                            alignItems="center"
                            justifyContent="space-between"
                            gap={2}
                        >
                            <TextInput
                                className={b('input')}
                                placeholder={'Поиск'}
                                size="m"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                size="m"
                                view="action"
                                onClick={handleAdd}
                            >
                                Добавить
                            </Button>
                        </Flex>

                        <div className={b('table-wrapper')}>
                            <{{ pascalCase name }}Table
                                data={items}
                                columns={columns}
                                getRowActions={rowActions}
                                className={b('table')}
                                onRowClick={(file) => {
                                    push(`/items/${file.id}`);
                                }}
                            />
                        </div>
                    </>
                )}
            </Flex>
    );
};
