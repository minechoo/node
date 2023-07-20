import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function List() {
	const [Posts, setPosts] = useState([]);
	useEffect(() => {
		axios.post('/api/read').then((res) => {
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
						<h2>{post.title}</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
