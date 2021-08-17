import Head from 'next/head'
import Header from '../components/Header'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow'
import { useRouter } from 'next/dist/client/router'

export default function Home() {
	const [session] = useSession()
	if (!session) return <Login />

	const [showModal, setShowModal] = useState(false)
	const [input, setInput] = useState('')
	const [snapshot] = useCollectionOnce(
		db
			.collection('userDocs')
			.doc(session.user.email)
			.collection('docs')
			.orderBy('timestamp', 'desc')
	)

	const router = useRouter()

	const createDocument = async () => {
		if (!input) return

		const { id } = await db
			.collection('userDocs')
			.doc(session.user.email)
			.collection('docs')
			.add({
				fileName: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			})
		setInput('')
		setShowModal(false)
		router.push(`/doc/${id}`)
	}

	const modal = (
		<Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
			<ModalBody>
				<input
					type='text'
					value={input}
					className='outline-none'
					onChange={e => setInput(e.target.value)}
					placeholder='Enter name of the doc'
					onKeyDown={e => e.key === 'Enter' && createDocument()}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					color='blue'
					buttonType='link'
					ripple='dark'
					onClick={e => setShowModal(false)}
				>
					Cancel
				</Button>
				<Button color='blue' onClick={createDocument} ripple='light'>
					Create
				</Button>
			</ModalFooter>
		</Modal>
	)

	return (
		<div>
			<Head>
				<title>Google Docs Clone</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			{modal}

			<section className='bg-[#f8f9fa] pb-10 px-10'>
				<div className='max-w-3xl mx-auto'>
					<div className='py-6 flex items-center justify-between'>
						<h2 className='text-gray-700 text-lg'>Start a new doc</h2>
						<Button
							color='gray'
							buttonType='outline'
							iconOnly={true}
							rounded={true}
							ripple='dark'
							className='border-0'
						>
							<Icon name='more_vert' size='3xl' />
						</Button>
					</div>
					<div>
						<div
							className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'
							onClick={e => setShowModal(true)}
						>
							<Image src='https://links.papareact.com/pju' layout='fill' />
						</div>
						<p className='ml-2 mt-1 font-semibold text-gray-700 text-sm'>
							Blank
						</p>
					</div>
				</div>
			</section>
			<section className='bg-white px-10 md:px-0'>
				<div className='max-w-3xl mx-auto py-8 text-gray-700 text-sm'>
					<div className='flex items-center justify-between pb-5'>
						<h2 className='font-medium flex-grow'>My Documents</h2>
						<p className='mr-12'>Date created</p>
						<Icon name='folder' size='3xl' color='gray' />
					</div>
					{snapshot?.docs?.map(doc => (
						<DocumentRow
							key={doc.id}
							id={doc.id}
							date={doc.data().timestamp}
							fileName={doc.data().fileName}
						/>
					))}
				</div>
			</section>
		</div>
	)
}

export const getServerSideProps = async context => {
	const session = await getSession(context)
	return {
		props: {
			session,
		},
	}
}
