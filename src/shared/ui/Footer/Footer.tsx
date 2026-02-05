import { Logo } from '@shared/ui/Logo';
import { PolicyModal } from '@shared/ui/Modal';
import { useState } from 'react';
import { footerStyles } from './Footer.styles';
import { POLICY_CONTENTS } from './policyData';

type FooterText = {
  label: string;
  href: string;
  isBold?: boolean;
};

const POLICY_KEYS: FooterText[] = [
  { label: '이용약관', href: '/terms' },
  { label: '개인정보처리방침', href: '/privacy', isBold: true },
  { label: '운영정책', href: '/policy' },
  { label: '위치기반서비스 이용약관', href: '/location-terms' },
  { label: '이용자보호 비전과 계획', href: '/protection' },
  { label: '청소년보호정책', href: '/youth-protection' },
];

export const Footer = () => {
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const handlePolicyClick = (href: string) => {
    setActivePolicy(href);
  };

  const handleClosePolicy = () => {
    setActivePolicy(null);
  };

  const getPolicyTitle = (href: string) => {
    return POLICY_KEYS.find((link) => link.href === href)?.label ?? '약관';
  };

  return (
    <>
      <footer className={footerStyles.root}>
        <div className={footerStyles.inner}>
          <Logo className={footerStyles.logo} />

          <div className={footerStyles.infoSection}>
            <h3 className={footerStyles.infoTitle}>루핏(주) 사업자정보</h3>

            <div className={footerStyles.infoRow}>
              <span>Members 이정윤, 도채연, 김기찬, 김민지, 박소윤, 이경준, 정원준, 최예빈</span>
              <span className={footerStyles.separator} />
              <span>사업자번호 287-38-01540</span>
            </div>

            <div className={footerStyles.infoRow}>
              <span>주소 경기 성남시 수정구 복정동 495</span>
            </div>

            <div className={footerStyles.infoRow}>
              <span>전화 010-5324-0756</span>
              <span className={footerStyles.separator} />
            </div>
          </div>

          <div className={footerStyles.linkSection}>
            {POLICY_KEYS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handlePolicyClick(link.href)}
                className={`${footerStyles.linkItem} ${link.isBold ? footerStyles.boldLink : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={Boolean(activePolicy)}
        onClose={handleClosePolicy}
        title={activePolicy ? getPolicyTitle(activePolicy) : ''}
      >
        {activePolicy ? POLICY_CONTENTS[activePolicy] : ''}
      </PolicyModal>
    </>
  );
};
