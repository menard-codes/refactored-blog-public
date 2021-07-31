export const uiconfig = firebase => ({
    signInFlow: 'redirect',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/',
    tosUrl: '/tos',
    privacyPolicyUrl: '/privacy',
});
