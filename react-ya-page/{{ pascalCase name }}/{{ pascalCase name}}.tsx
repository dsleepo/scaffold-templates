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
import {useQuery} from '@tanstack/react-query';
import {
    StatusIllustrationStatus,
    PlaceholderContainer,
} from '@yandex-data-ui/cloud-components';
import {Flex, Loader} from '@gravity-ui/uikit';

import PageHeader from 'components/PageHeader/PageHeader';
import Page from 'components/Page/Page';

import {useTypedParams} from 'hooks/useTypedParams';
import routes, {getRoute} from 'routes';
import sdk from 'services/sdk';
import {cn} from 'util/cn';
import {extractMessage} from 'util/error';

import './{{ pascalCase name }}.scss';

const b = cn('{{ kebabCase name }}');

type {{ pascalCase name }}Props = {};

export const {{ pascalCase name }}: FC<{{ pascalCase name }}Props> = () => {
    const {scopeId, id} =
        useTypedParams<typeof routes.{{ camelCase name }}>();

    const {isLoading, error, data} = useQuery({
        queryKey: ['get{{ pascalCase name }}', id],
        queryFn: () => sdk.monitoringCloud.get{{ pascalCase name }}({id}),
    });

    const {push} = useHistory();

    return (
        <Page className={b()}>
            <PageHeader
                breadcrumbs={[
                    {
                        onClick: () =>
                            push(getRoute(routes.{{ camelCase name }}, {scopeId})),
                        text: 'Page title',
                    },
                    {
                        text: id,
                    },
                ]}
            />
            <Page.Content className={b()}>
                {isLoading && (
                    <Flex justifyContent="center">
                        <Loader size="l" />
                    </Flex>
                )}
                {!isLoading && error && (
                    <PlaceholderContainer
                        status={StatusIllustrationStatus.AccessDenied}
                        title={'Произошла ошибка'}
                        description={extractMessage(error)}
                    />
                )}
                {!isLoading && !error && (
                    <pre>
                        <code>{JSON.stringify(data)}</code>
                    </pre>
                )}
            </Page.Content>
        </Page>
    );
};

export default {{ pascalCase name }}Name;
