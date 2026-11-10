package email

import (
	"strings"
	"testing"
)

func TestSurfaceBrandingDefaultsAndTenantOverrides(t *testing.T) {
	t.Setenv("SITE_NAME", "")
	t.Setenv("CLIENT_NAME", "")
	if got := siteName(); got != "Go Web Framework" {
		t.Fatalf("siteName() = %q, want Go Web Framework", got)
	}
	if html := VerifyEmailHTML("reader", "token"); !strings.Contains(html, "Go Web Framework") {
		t.Fatal("default transactional email does not show Go Web Framework")
	}

	t.Setenv("SITE_NAME", "Example Tenant")
	if got := siteName(); got != "Example Tenant" {
		t.Fatalf("siteName() = %q, want tenant override", got)
	}
	if html := VerifyEmailHTML("reader", "token"); strings.Contains(html, "Go Web Framework") || !strings.Contains(html, "Example Tenant") {
		t.Fatal("tenant site name did not remain authoritative in transactional email")
	}
}

func TestSenderUsesGoWebFrameworkOnlyAsFinalFallback(t *testing.T) {
	t.Setenv("SMTP_HOST", "smtp.example.test")
	t.Setenv("SMTP_FROM_NAME", "")
	t.Setenv("CLIENT_NAME", "")
	t.Setenv("DOMAINS", "")
	if sender := NewSenderFromEnv(); sender == nil || sender.fromName != "Go Web Framework" {
		t.Fatalf("default sender = %#v, want Go Web Framework", sender)
	}

	t.Setenv("CLIENT_NAME", "writer_co")
	if sender := NewSenderFromEnv(); sender == nil || sender.fromName != "Writer_co" {
		t.Fatalf("client sender = %#v, want client-derived override", sender)
	}
}
