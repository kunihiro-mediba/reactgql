import { FC } from "react";
import { useQuery, gql } from "@apollo/client";

import { formatDate } from "../util/date";

interface Notice {
    id: number;
    title: string;
    date: string;
    url: string;
}
interface GetNoticeListResponse {
    notices: {
        list: Notice[];
        currentPage: string;
        totalPages: string;
    };
}

const getNoticeListQuery = gql`
    {
        notices(page: 1) {
            list {
                id
                title
                date
                url
            }
            currentPage
            totalPages
        }
    }
`;

export const NoticeList: FC = () => {
    const { loading, error, data } = useQuery<GetNoticeListResponse>(getNoticeListQuery);
    if (error) {
        throw error;
    }
    if (loading || !data) {
        return null;
    }
    const {
        notices: { list },
    } = data;

    return (
        <div>
            {list.map((notice: Notice) => {
                return (
                    <div key={notice.id}>
                        <a href={notice.url}>
                            <div>{notice.title}</div>
                            <div>{formatDate(notice.date)}</div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};
