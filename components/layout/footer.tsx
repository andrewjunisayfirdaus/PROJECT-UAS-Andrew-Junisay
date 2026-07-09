import { IconShieldCheck } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <IconShieldCheck size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg">Drive Safe</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistem deteksi kantuk cerdas untuk keselamatan berkendara Anda.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/detection" className="hover:text-foreground transition-colors">Detection</a></li>
              <li><a href="/profile" className="hover:text-foreground transition-colors">Profile</a></li>
              <li><a href="/history" className="hover:text-foreground transition-colors">History</a></li>
              <li><a href="/quest" className="hover:text-foreground transition-colors">Quest</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@drivesafe.com</li>
              <li>+62 542 123 456</li>
              <li>Balikpapan, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Drive Safe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
