import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function List() {
	const [Posts, setPosts] = useState([]);
	useEffect(() => {
		axios.post('/api/community/read').then((res) => {
			console.log(res);
			setPosts(res.data.communityList);
		});
	}, []);
	return (
		<Layout name={'List'}>
			{/* map의 idx는 권장사항 아님 */}
			{Posts.map((post) => {
				return (
					// 몽고디비에 있는 고유값 _id
					<article key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
