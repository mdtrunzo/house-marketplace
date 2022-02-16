import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
import githubIcon from '../assets/svg/github.svg'
import { toast } from 'react-toastify'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            //Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            //If user doesn't existe, create it
            if(!docSnap.exists()){
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    }
    const onGithubClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GithubAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            //If user doesn't existe, create it
            if(!docSnap.exists()){
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Github')
        }
    }

  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up' ? 'up ' : 'in '}
        with</p>
        <div className="loginIconsButtons">
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img src={googleIcon} alt='Google Icon' className='socialIconImg'/>
            </button>
            <button className="socialIconDiv" onClick={onGithubClick}>
                <img src={githubIcon} alt='Github Icon' className='socialIconImgGit' />
            </button>
        </div>
    </div>
  )
}

export default OAuth