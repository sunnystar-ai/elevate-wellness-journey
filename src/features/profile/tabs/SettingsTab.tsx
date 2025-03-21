
import AccountSettings from '../settings/AccountSettings';
import AppPreferences from '../settings/AppPreferences';
import NotificationsSettings from '../settings/NotificationsSettings';
import SubscriptionSection from '../settings/SubscriptionSection';
import HelpSupportSection from '../settings/HelpSupportSection';
import LogoutSection from '../settings/LogoutSection';

const SettingsTab = () => {
  return (
    <div className="space-y-5">
      <AccountSettings />
      <AppPreferences />
      <NotificationsSettings />
      <SubscriptionSection />
      <HelpSupportSection />
      <LogoutSection />
    </div>
  );
};

export default SettingsTab;
