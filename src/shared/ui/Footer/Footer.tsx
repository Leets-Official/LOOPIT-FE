import { Logo } from '@shared/ui/Logo';
import { PolicyModal } from '@shared/ui/Modal';
import { useState } from 'react';
import { footerVariants } from './Footer.variants';
import { POLICY_CONTENTS } from './policyData';

type FooterLink = {
  label: string;
  href: string; // 실제로는 id 역할
  isBold?: boolean;
};

const FOOTER_LINKS: FooterLink[] = [
  { label: '이용약관', href: '/terms' },
  { label: '개인정보처리방침', href: '/privacy', isBold: true },
  { label: '운영정책', href: '/policy' },
  { label: '위치기반서비스 이용약관', href: '/location-terms' },
  { label: '이용자보호 비전과 계획', href: '/protection' },
  { label: '청소년보호정책', href: '/youth-protection' },
];

export const Footer = () => {
  const styles = footerVariants();
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const handlePolicyClick = (href: string) => {
    setActivePolicy(href);
  };

  const handleClosePolicy = () => {
    setActivePolicy(null);
  };

  const getPolicyTitle = (href: string) => {
    return FOOTER_LINKS.find((link) => link.href === href)?.label ?? '약관';
  };

  return (
    <>
      <footer className={styles.root()}>
        <div className={styles.inner()}>
          <Logo className={styles.logo()} />

          <div className={styles.infoSection()}>
            <h3 className={styles.infoTitle()}>루핏(주) 사업자정보</h3>

            <div className={styles.infoRow()}>
              <span>Members 이정윤, 도채연, 김기찬, 김민지, 박소윤, 이경준, 정원준, 최예빈</span>
              <span className="h-[10px] w-[1px] bg-gray-300" />
              <span>사업자번호 287-38-01540</span>
            </div>

            <div className={styles.infoRow()}>
              <span>주소 경기 성남시 수정구 복정동 495</span>
            </div>

            <div className={styles.infoRow()}>
              <span>전화 010-5324-0756</span>
              <span className="h-[10px] w-[1px] bg-gray-300" />
            </div>
          </div>

          <div className={styles.linkSection()}>
            {FOOTER_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handlePolicyClick(link.href)}
                className={styles.linkItem({ className: link.isBold ? styles.boldLink() : '' })}
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
