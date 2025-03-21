
import RecentActivity from '../activity/RecentActivity';
import ActivityStats from '../activity/ActivityStats';

const ActivityTab = () => {
  return (
    <div className="space-y-5">
      <RecentActivity />
      <ActivityStats />
    </div>
  );
};

export default ActivityTab;
