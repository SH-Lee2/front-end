import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CateHeader from '../../components/CateHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { dailyCategory } from '../../services/category';
import * as c from '../../styles/Category';
import { PageT, Post } from '../../types/types';

const DailyLook = () => {
    const [data, setData] = useState<Post[]>([]);
    const [region, setRegion] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<PageT>({});
    const [curPage, setCurPage] = useState(1);

    const getRegionHandler = (reg :string) => { setRegion(reg) }

    const getDaily = async () => {
        setIsLoading(true)
        const res = await dailyCategory(region, curPage)
        setData(res.data.data.list)
        setPage(res.data.data.pageable)
        setIsLoading(false)
    }

    useEffect(() => {
        getDaily()
    },[region, curPage])

    return (
        <c.Container>
            <CateHeader categoryNum={0} category='데일리룩' onGetRegionNumber={getRegionHandler} />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                <c.Imgs>
                    {data && (
                        data.map((art,i) => (
                            <c.Card key={i}>
                                <Link to={`/today_clothes/dailylook/${art.artNo}`} state={{ artNo: art.artNo }}>
                                    <c.Thumnail>
                                        <c.Img src={art.imgPath} alt='DailyLook'/>
                                    </c.Thumnail>
                                    <p id='color'>{art.artSubject}</p>
                                    <span id='color'>{art.useNick}&nbsp;</span>
                                    <span id='dis'>{art.regAddr1} {art.regAddr2}</span>
                                </Link>
                            </c.Card>
                        ))
                    )}
                </c.Imgs>
                {data.length > 0 && (
                    <Pagination curPage={curPage} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
                )}
                </>
            )}
            
        </c.Container>
    );
};

export default DailyLook;