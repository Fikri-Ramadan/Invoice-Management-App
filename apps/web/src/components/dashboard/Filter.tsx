import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Filter({ placeholder }: { placeholder: string }) {
  return (
    <div className="w-fit flex items-center gap-2">
      <Input placeholder={placeholder} className="border-slate-500" />
      <Button>Filter</Button>
    </div>
  );
}
