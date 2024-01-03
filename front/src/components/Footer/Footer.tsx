import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerContacts}>
                    <h4 className={styles.footerContactsTitle}>Contacts</h4>
                    <p className={styles.footerContactsText}>
                        Country: Ukraine<br/>
                        City: Kyiv<br/>
                        Street: 123 Azure Street<br/>
                        Zip Code: 01010<br/>
                        Phone number: +1 (555) 123-4567<br/>
                        Mobile number: +38 (096) 321-7654<br/>
                    </p>
                </div>
                <div className={styles.footerSocial}>
                    <h4 className={styles.footerSocialTitle}>Newsletter</h4>
                    <ul className={styles.footerSocialList}>
                        <li className={styles.footerSocialListItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M11.9365 7.06885C8.97355 7.06885 6.51852 9.48155 6.51852 12.4868C6.51852 15.4921 8.93122 17.9048 11.9365 17.9048C14.9418 17.9048 17.3545 15.4498 17.3545 12.4868C17.3545 9.52387 14.8995 7.06885 11.9365 7.06885ZM11.9365 15.9577C10.0318 15.9577 8.46561 14.3916 8.46561 12.4868C8.46561 10.5821 10.0318 9.01594 11.9365 9.01594C13.8413 9.01594 15.4074 10.5821 15.4074 12.4868C15.4074 14.3916 13.8413 15.9577 11.9365 15.9577Z"
                                    fill="#FFFBF5"/>
                                <path
                                    d="M17.5661 8.16938C18.2441 8.16938 18.7937 7.61981 18.7937 6.94187C18.7937 6.26393 18.2441 5.71436 17.5661 5.71436C16.8882 5.71436 16.3386 6.26393 16.3386 6.94187C16.3386 7.61981 16.8882 8.16938 17.5661 8.16938Z"
                                    fill="#FFFBF5"/>
                                <path
                                    d="M20.7407 3.76719C19.6402 2.62433 18.0741 2.03174 16.2963 2.03174H7.57671C3.89417 2.03174 1.43915 4.48676 1.43915 8.1693V16.8466C1.43915 18.6667 2.03174 20.2328 3.21693 21.3757C4.35978 22.4762 5.88359 23.0264 7.61904 23.0264H16.254C18.0741 23.0264 19.5979 22.4339 20.6984 21.3757C21.8413 20.2751 22.4339 18.709 22.4339 16.8889V8.1693C22.4339 6.39153 21.8413 4.86772 20.7407 3.76719ZM20.5714 16.8889C20.5714 18.2011 20.1058 19.2593 19.3439 19.9788C18.582 20.6984 17.5238 21.0794 16.254 21.0794H7.61904C6.3492 21.0794 5.291 20.6984 4.5291 19.9788C3.76719 19.2169 3.38624 18.1587 3.38624 16.8466V8.1693C3.38624 6.89946 3.76719 5.84126 4.5291 5.07936C5.24867 4.35978 6.3492 3.97883 7.61904 3.97883H16.3386C17.6085 3.97883 18.6667 4.35978 19.4286 5.12169C20.1481 5.88359 20.5714 6.94179 20.5714 8.1693V16.8889Z"
                                    fill="#FFFBF5"/>
                            </svg>
                        </li>
                        <li className={styles.footerSocialListItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M12.154 10.7296L8.08868 5.04126H5.92041L10.9563 12.0872L11.5902 12.9735L15.9006 19.0096H18.0689L12.7852 11.616L12.154 10.7296Z"
                                    fill="#FFFBF5"/>
                                <path
                                    d="M21.1598 1H2.84021C1.82385 1 1 1.82385 1 2.84021V21.1598C1 22.1761 1.82385 23 2.84021 23H21.1598C22.1761 23 23 22.1761 23 21.1598V2.84021C23 1.82385 22.1761 1 21.1598 1ZM15.2354 20L10.8728 13.787L5.41144 20H4L10.2469 12.8953L4 4H8.76465L12.8948 9.88196L18.0696 4H19.481L13.524 10.7756L20 20H15.2354Z"
                                    fill="#FFFBF5"/>
                            </svg>
                        </li>
                        <li className={styles.footerSocialListItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <g clipPath="url(#clip0_29_32)">
                                    <path
                                        d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM18.2371 7.59075L16.1058 17.7656C16.08 17.8887 16.0237 18.0033 15.9421 18.0989C15.8605 18.1946 15.7561 18.2681 15.6386 18.3129C15.5211 18.3577 15.3942 18.3722 15.2697 18.3551C15.1451 18.3381 15.0268 18.29 14.9257 18.2153L11.8255 15.9249L9.94734 17.6968C9.92276 17.72 9.8938 17.7381 9.86216 17.75C9.83051 17.7618 9.79682 17.7673 9.76305 17.766C9.72927 17.7647 9.69609 17.7567 9.66544 17.7425C9.63479 17.7282 9.60729 17.708 9.58453 17.683L9.54417 17.6387L9.87052 14.4805L15.7526 9.10622C15.7817 9.07969 15.7998 9.04321 15.8033 9.004C15.8068 8.96478 15.7955 8.92567 15.7716 8.89438C15.7477 8.86309 15.7129 8.8419 15.6742 8.83497C15.6354 8.82805 15.5955 8.8359 15.5622 8.85699L8.03977 13.6181L4.8 12.53C4.71386 12.5011 4.63878 12.4462 4.58506 12.3729C4.53135 12.2996 4.50163 12.2115 4.49999 12.1206C4.49835 12.0297 4.52486 11.9406 4.57588 11.8654C4.62691 11.7902 4.69996 11.7326 4.785 11.7006L17.4609 6.9255C17.5587 6.8887 17.6646 6.87885 17.7675 6.89697C17.8704 6.91509 17.9665 6.96052 18.0458 7.02851C18.1252 7.0965 18.1848 7.18455 18.2184 7.28345C18.2521 7.38236 18.2585 7.48849 18.2371 7.59075Z"
                                        fill="#FFFBF5"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_29_32">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                        <li className={styles.footerSocialListItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <g clipPath="url(#clip0_29_34)">
                                    <path
                                        d="M22.676 0H1.324C0.593 0 0 0.593 0 1.324V22.676C0 23.408 0.593 24 1.324 24H12.818V14.706H9.689V11.085H12.818V8.41C12.818 5.311 14.712 3.625 17.477 3.625C18.802 3.625 19.941 3.722 20.273 3.766V7.006H18.352C16.852 7.006 16.56 7.727 16.56 8.777V11.088H20.144L19.679 14.718H16.56V24H22.675C23.408 24 24 23.408 24 22.676V1.324C24 0.593 23.408 0 22.676 0Z"
                                        fill="#FFFBF5"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_29_34">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
            <p className={styles.footerCopyright}>© 2023 @RRedBaron Product, ALL RIGHTS RESERVED.</p>
        </footer>
    )
}

export default Footer;