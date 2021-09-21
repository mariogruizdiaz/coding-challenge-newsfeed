import { useQuery } from '@apollo/client';
import { UsersQueryData, UsersQueryVars, USERS_QUERY } from 'dataaccessobjects/queries';
import { FieldNode } from 'graphql';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled, { CSSProperties } from 'styled-components';
import UserCard from './UserCard';

const divStyle: CSSProperties = {
    color: 'blue',
    textAlign: 'center',
    padding: '5px 10px',
    background: '#eee',
    marginBottom: '15px',
};


const ScrollcontentStyle: CSSProperties = {
    height: '300px',
    margin: '0 auto',
    overflow: 'auto',
    display: 'flex',
}


type Props = {
    fellowships: string[],
    pageSize: number
};

const Users = ({ fellowships, pageSize }: Props) => {
    const [page, setPage] = useState(-1);
    const [moreItemsInTheDB, setMoreItemsInTheDB] = useState(true);
    const [list, setList] = useState(new Array());
    const [filters, serFilters] = useState(new Array());
    const loader = useRef(null);
    const { data, error, loading, refetch } = useQuery<UsersQueryData, UsersQueryVars>(
        USERS_QUERY,
        {
            skip: (page < 0 || !moreItemsInTheDB),
            variables: {
                limit: pageSize,
                page,
                fellowships: filters
            },
        }
    )
    useEffect(() => {
        setMoreItemsInTheDB(true);
        setList(new Array());
        setPage(-1);
        serFilters(fellowships);
    }, [fellowships])

    useEffect(() => {
        if (data?.users.length) {
            const newList = list.concat(...data.users);
            setList(newList);
            if (data?.users.length < pageSize) {
                setMoreItemsInTheDB(false);
            }
        } else {
            if (page >= 0 && data?.users.length === 0) {
                setMoreItemsInTheDB(false);
            }
        }
    }, [data])


    // here we handle what happens when user scrolls to Load More div
    // in this case we just update page variable
    const handleObserver = useCallback((entities: any[]) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prev) => {
                const newPage = prev + 1;
                return newPage;
            });
        }
    }, []);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer: IntersectionObserver = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, [handleObserver]);

    return (
        <ContainerList>
            <h2>Founders!</h2>
            <div style={ScrollcontentStyle}>
                <div>
                    {
                        list.map((user, index) => {
                            return (
                                <DivCardContainer key={index}>
                                    {/* <h2> {user.name} </h2> */}
                                    <UserCard user={user} />
                                </DivCardContainer>
                            )
                        })
                    }
                    <div ref={loader}>
                        <h3>
                            {
                                error && `Error loading data ${error.message}`
                            }
                            {
                                loading && `loading items...`
                            }
                            {
                                moreItemsInTheDB && `Load more items`
                            }
                        </h3>
                    </div>
                </div>
            </div>
        </ContainerList>
    )
}

const ContainerList = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
`

const DivCardContainer = styled.div`
    color: 'blue',
    textAlign: 'center',
    padding: '5px 10px',
    background: '#eee',
    margin: '15px',
`

export default Users;