import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const BtnSet = styled.nav`
	display: flex;
	gap: 20px;
	margin-top: 20px;
`;

function Login() {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!Email && Pwd) return alert('모든 값을 입력하세요');
		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			alert('로그인 되었습니다');
			navigate('/');
		} catch (err) {
			console.log(err);
			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일입니다');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호가 일치하지 않습니다');
			else setErr('로그인에 실패했습니다');
		}
	};

	useEffect(() => {
		if (user.uid !== '') navigate('/');
	}, [navigate, user]);

	return (
		<Layout name={'Login'}>
			<input
				type='email'
				value={Email}
				id=''
				onChange={(e) => setEmail(e.target.value)}
				placeholder='이메일 주소를 입력하세요'
			/>
			<input
				type='password'
				value={Pwd}
				id=''
				onChange={(e) => setPwd(e.target.value)}
				placeholder='비밀번호를 입력하세요'
			/>

			<BtnSet>
				<button onClick={handleLogin}>로그인</button>
				<button onClick={() => navigate('/join')}>회원가입</button>
			</BtnSet>
			{Err !== '' && <p>{Err}</p>}
		</Layout>
	);
}

export default Login;
