import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, TrendingDown, Copy, Check, ExternalLink, Code2, Wind, Sparkles, Zap, Share2, MessageSquare } from "lucide-react";
import { SiOpenai, SiAnthropic, SiGoogle, SiReplit, SiX, SiLinkedin, SiFacebook, SiWhatsapp, SiTelegram } from "react-icons/si";
import { Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { OptimizationResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface OptimizationPanelProps {
  data: OptimizationResponse;
}

const iconMap: Record<string, any> = {
  "SiOpenai": SiOpenai,
  "SiAnthropic": SiAnthropic,
  "SiGoogle": SiGoogle,
  "SiReplit": SiReplit,
  "Code2": Code2,
  "Wind": Wind,
  "Sparkles": Sparkles,
  "Zap": Zap,
  "MessageSquare": MessageSquare,
};

export function OptimizationPanel({ data }: OptimizationPanelProps) {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { toast } = useToast();
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: t.optimization.copied,
        description: t.optimization.copyPrompt,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: t.common.error,
        description: t.optimization.copyError,
        variant: "destructive",
      });
    }
  };

  const shareToSocial = (platform: string) => {
    const shareText = `${t.optimization.title}\n\n${data.optimizedPrompt}\n\n%${data.tokenReduction.toFixed(1)} ${t.optimization.tokenReduction}!`;
    const shareUrl = window.location.href;
    
    let url = "";
    
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent(t.optimization.title)}&body=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
      toast({
        title: t.common.shareOpened,
        description: `${platform.charAt(0).toUpperCase() + platform.slice(1)} ${t.common.shareOpenedDesc}`,
      });
      setShowShareMenu(false);
    }
  };

  return (
    <Card data-testid="card-optimization">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl">{t.optimization.title}</CardTitle>
        <CardDescription>
          {t.optimization.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="default" className="text-base px-4 py-2" data-testid="badge-token-reduction">
            <ArrowDown className="w-4 h-4 mr-1" />
            %{data.tokenReduction.toFixed(1)} {t.optimization.tokenReduction}
          </Badge>
          <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-cost-savings">
            <TrendingDown className="w-4 h-4 mr-1" />
            %{data.costSavings.toFixed(1)} {t.optimization.costSavings}
          </Badge>
        </div>

        <Tabs defaultValue="formatted" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="formatted" data-testid="tab-formatted">{t.optimization.tabs.formatted}</TabsTrigger>
            <TabsTrigger value="comparison" data-testid="tab-comparison">{t.optimization.tabs.optimized}</TabsTrigger>
            <TabsTrigger value="toon" data-testid="tab-toon">{t.optimization.tabs.toon}</TabsTrigger>
            <TabsTrigger value="links" data-testid="tab-links">{t.optimization.tabs.aiLinks}</TabsTrigger>
          </TabsList>

          <TabsContent value="formatted" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-lg">{t.optimization.title}</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(data.formattedPrompt, "formatted")}
                  data-testid="button-copy-formatted"
                >
                  {copiedField === "formatted" ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {t.optimization.copyPrompt}
                </Button>
                <div className="relative" ref={shareMenuRef}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    data-testid="button-share-toggle"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {t.optimization.sharePrompt}
                  </Button>
                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => shareToSocial("twitter")}
                          data-testid="button-share-twitter"
                        >
                          <SiX className="w-4 h-4 mr-2" />
                          Twitter/X
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => shareToSocial("linkedin")}
                          data-testid="button-share-linkedin"
                        >
                          <SiLinkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => shareToSocial("facebook")}
                          data-testid="button-share-facebook"
                        >
                          <SiFacebook className="w-4 h-4 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => shareToSocial("whatsapp")}
                          data-testid="button-share-whatsapp"
                        >
                          <SiWhatsapp className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => shareToSocial("telegram")}
                          data-testid="button-share-telegram"
                        >
                          <SiTelegram className="w-4 h-4 mr-2" />
                          Telegram
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => shareToSocial("email")}
                          data-testid="button-share-email"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div 
              className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 prose prose-sm max-w-none"
              data-testid="text-formatted-prompt"
            >
              <ReactMarkdown>{data.formattedPrompt}</ReactMarkdown>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{t.optimization.originalTokens}</h3>
                  <span className="text-sm text-muted-foreground font-mono" data-testid="text-original-tokens">
                    {data.originalTokenCount.toLocaleString('tr-TR')} {t.results.tokens}
                  </span>
                </div>
                <div 
                  className="bg-muted/50 rounded-md p-4 border font-mono text-sm whitespace-pre-wrap min-h-[200px]"
                  data-testid="text-original-prompt"
                >
                  {data.originalPrompt}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{t.optimization.optimizedTokens}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-mono" data-testid="text-optimized-tokens">
                      {data.optimizedTokenCount.toLocaleString('tr-TR')} {t.results.tokens}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(data.optimizedPrompt, "optimized")}
                      data-testid="button-copy-optimized"
                    >
                      {copiedField === "optimized" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div 
                  className="bg-primary/5 rounded-md p-4 border border-primary/20 font-mono text-sm whitespace-pre-wrap min-h-[200px]"
                  data-testid="text-optimized-prompt"
                >
                  {data.optimizedPrompt}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="toon" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{t.optimization.toonTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.optimization.toonDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Badge variant="outline" className="justify-center py-2" data-testid="badge-toon-benefit-1">
                  {t.optimization.toonBenefit1}
                </Badge>
                <Badge variant="outline" className="justify-center py-2" data-testid="badge-toon-benefit-2">
                  {t.optimization.toonBenefit2}
                </Badge>
                <Badge variant="outline" className="justify-center py-2" data-testid="badge-toon-benefit-3">
                  {t.optimization.toonBenefit3}
                </Badge>
                <Badge variant="outline" className="justify-center py-2" data-testid="badge-toon-benefit-4">
                  {t.optimization.toonBenefit4}
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xs text-muted-foreground">{t.optimization.optimizedTokens}</p>
                    <p className="text-2xl font-bold" data-testid="text-toon-optimized-tokens">
                      {data.optimizedTokenCount.toLocaleString('tr-TR')}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xs text-muted-foreground">{t.optimization.toonTokens}</p>
                    <p className="text-2xl font-bold text-primary" data-testid="text-toon-token-count">
                      {data.toonTokenCount.toLocaleString('tr-TR')}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xs text-muted-foreground">{t.optimization.toonTokenReduction}</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-toon-reduction">
                      %{data.toonTokenReduction.toFixed(1)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{t.optimization.toonTitle}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(data.toonFormat, "toon")}
                    data-testid="button-copy-toon"
                  >
                    {copiedField === "toon" ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {t.optimization.copyPrompt}
                  </Button>
                </div>
                <div 
                  className="bg-gradient-to-br from-green-500/5 to-emerald-500/10 rounded-lg p-6 border border-green-500/20 font-mono text-sm whitespace-pre-wrap min-h-[300px]"
                  data-testid="text-toon-format"
                >
                  {data.toonFormat}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="links" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{t.optimization.aiLinksTitle}</h3>
              <p className="text-sm text-muted-foreground">
                {t.optimization.aiLinksDesc}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.aiModelLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const handleClick = async (e: React.MouseEvent) => {
                  e.preventDefault();
                  try {
                    await navigator.clipboard.writeText(data.optimizedPrompt);
                    toast({
                      title: t.optimization.promptCopied,
                      description: `${link.name} ${t.optimization.promptCopiedDesc}`,
                    });
                    window.open(link.url, '_blank');
                  } catch (err) {
                    toast({
                      title: t.common.error,
                      description: t.optimization.copyError,
                      variant: "destructive",
                    });
                  }
                };
                
                return (
                  <button
                    key={link.name}
                    onClick={handleClick}
                    data-testid={`link-ai-${link.name.toLowerCase()}`}
                    className="group"
                  >
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground text-center">
                        {t.optimization.chatWith} {link.name}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full flex-col gap-2"
                        size="lg"
                        asChild
                      >
                        <div>
                          {Icon && <Icon className="w-6 h-6" />}
                          <span className="text-sm font-medium">{link.name}</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </Button>
                    </div>
                  </button>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
