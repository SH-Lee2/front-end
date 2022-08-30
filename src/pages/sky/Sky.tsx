import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CateHeader from '../../components/CateHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { skyCategory } from '../../services/category';
import * as c from '../../styles/Category';
import { PageT, Post } from '../../types/types';

const Sky = () => {
    const [data, setData] = useState<Post[]>([]);
    const [region, setRegion] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);    
    const [page, setPage] = useState<PageT>({});
    const [curPage, setCurPage] = useState(1);
    
    const getRegionHandler = (reg :string) => { setRegion(reg) }

    const getSky = async () => {
        setIsLoading(true)
        const res = await skyCategory(region, curPage)
        setData(res.data.data.list)
        setPage(res.data.data.pageable)
        setIsLoading(false)
    }

    useEffect(() => {
        getSky()
    },[region, curPage])

    return (
        <c.Container>
            <CateHeader categoryNum={2} category='오늘의 하늘' onGetRegionNumber={getRegionHandler} />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                <c.Imgs>
                    {data && (
                        data.map((art,i) => (
                            <c.Card key={i}>
                                <Link to={`/today_sky/${art.artNo}`} state={{ artNo: art.artNo }}>
                                    <c.Thumnail>
                                        <c.Img src={art.imgPath} alt='Sky'/>
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
                    <Pagination curPage={(curPage)} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
                )}
                </>
            )}
            
        </c.Container>
    );
};

export default Sky;